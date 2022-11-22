import { NavMeshPathfindingBehavior } from "../NavMeshPathfindingBehavior";
import { NavMeshPathfindingConfiguration } from "../NavMeshPathfindingConfiguration";
import { NavMeshPathfindingObstacleBehavior } from "../NavMeshPathfindingObstacleBehavior";
import { MockedNavMeshPathfindingObstacleRuntimeBehavior } from "./mock/MockedNavMeshPathfindingObstacleRuntimeBehavior";
import { MockedNavMeshPathfindingRuntimeBehavior } from "./mock/MockedNavMeshPathfindingRuntimeBehavior";
import { MockedRuntimeBehavior } from "./mock/MockedRuntimeBehavior";
import { MockedRuntimeObject } from "./mock/MockedRuntimeObject";

describe('gdjs.NavMeshPathfindingBehavior', function () {
  const epsilon = 1 / (2 << 16);

  const createPlayerBehavior = (): gdjs.RuntimeBehavior & NavMeshPathfindingConfiguration => {
    const player = new MockedRuntimeObject();
    player.setCustomWidthAndHeight(90, 90);
    player.setCustomCenter(45, 45);
    const behavior = new MockedNavMeshPathfindingRuntimeBehavior(player, {
      acceleration: 400,
      maxSpeed: 200,
      angularMaxSpeed: 180,
      rotateObject: false,
      angleOffset: 0,
      extraBorder: 0,
      collisionShape: "Bounding disk",
    })
    //@ts-ignore
    return behavior;
  };

  const createObstacleBehavior = (): [gdjs.RuntimeObject, NavMeshPathfindingObstacleBehavior] => {
    const obstacle = new MockedRuntimeObject();
    obstacle.setCustomWidthAndHeight(100, 100);
    const behavior = new MockedNavMeshPathfindingObstacleRuntimeBehavior(obstacle, {
      viewpoint: 'Top-Down',
      areaLeftBound: 0,
      areaTopBound: 0,
      areaRightBound: 1280,
      areaBottomBound: 800,
      cellSize: 20,
    })
    //@ts-ignore
    const pathObstacle = new NavMeshPathfindingObstacleBehavior(runtimeScene, behavior);
    //@ts-ignore
    return [obstacle, pathObstacle];
  };

  let runtimeScene: gdjs.RuntimeInstanceContainer;
  
  let playerBehavior: gdjs.RuntimeBehavior & NavMeshPathfindingConfiguration;
  let pathFinding: NavMeshPathfindingBehavior;
  let player: gdjs.RuntimeObject;
  beforeEach(function () {
    //@ts-ignore
    runtimeScene = {};
    playerBehavior = createPlayerBehavior();
    pathFinding = new NavMeshPathfindingBehavior(playerBehavior);
    player = playerBehavior.owner;
  });

  it('can find a path without any obstacle at all', function () {
    player.setPosition(200, 300);
    pathFinding.moveTo(runtimeScene, 900, 300);
    expect(pathFinding.pathFound()).to.be(true);
    expect(pathFinding.pathFollower.getNodeCount()).to.be(2);
  });

  it('can find a path without any obstacle in the way', function () {
    const [obstacle, obstacleBehavior] = createObstacleBehavior();

    obstacle.setPosition(600, 600);
    // To ensure obstacles are registered.
    obstacleBehavior.doStepPreEvents(runtimeScene);

    player.setPosition(200, 300);
    pathFinding.moveTo(runtimeScene, 900, 300);
    expect(pathFinding.pathFound()).to.be(true);
    expect(pathFinding.pathFollower.getNodeCount()).to.be(2);
  });

  it("mustn't find a path to the obstacle inside", function () {
    const [obstacle, obstacleBehavior] = createObstacleBehavior();

    obstacle.setPosition(600, 300);
    // To ensure obstacles are registered.
    obstacleBehavior.doStepPreEvents(runtimeScene);

    player.setPosition(200, 300);
    pathFinding.moveTo(runtimeScene, 650, 350);
    expect(pathFinding.pathFound()).to.be(false);
  });

  it('can find a path with an obstacle in the way', function () {
    const [obstacle, obstacleBehavior] = createObstacleBehavior();

    obstacle.setPosition(600, 300);
    // To ensure obstacles are registered.
    obstacleBehavior.doStepPreEvents(runtimeScene);

    player.setPosition(200, 300);
    pathFinding.moveTo(runtimeScene, 900, 300);
    expect(pathFinding.pathFound()).to.be(true);
    expect(pathFinding.pathFollower.getNodeCount()).to.be.above(2);
  });

  it('can find a path between 2 obstacles', function () {
    const [topObstacle, topObstacleBehavior] = createObstacleBehavior();
    const [bottomObstacle, bottomObstacleBehavior] = createObstacleBehavior();

    topObstacle.setPosition(600, 150);
    bottomObstacle.setPosition(600, 450);
    // To ensure obstacles are registered.
    topObstacleBehavior.doStepPreEvents(runtimeScene);
    bottomObstacleBehavior.doStepPreEvents(runtimeScene);

    const pathwayTop = topObstacle.getY() + topObstacle.getHeight();
    const pathwayBottom = bottomObstacle.getY();
    player.setPosition(
      200,
      (pathwayTop + pathwayBottom) / 2 + player.getHeight() / 2
    );
    pathFinding.moveTo(runtimeScene, 900, player.getY());
    expect(pathFinding.pathFound()).to.be(true);
    expect(pathFinding.pathFollower.getNodeCount()).to.be(2);
  });

  it("mustn't find a path to a closed room", function () {
    const [topObstacle, topObstacleBehavior] = createObstacleBehavior();
    const [bottomObstacle, bottomObstacleBehavior] = createObstacleBehavior();
    const [leftObstacle, leftObstacleBehavior] = createObstacleBehavior();
    const [rightObstacle, rightObstacleBehavior] = createObstacleBehavior();

    topObstacle.setPosition(600, 140);
    bottomObstacle.setPosition(600, 460);
    leftObstacle.setPosition(440, 300);
    rightObstacle.setPosition(760, 300);
    // To ensure obstacles are registered.
    topObstacleBehavior.doStepPreEvents(runtimeScene);
    bottomObstacleBehavior.doStepPreEvents(runtimeScene);
    leftObstacleBehavior.doStepPreEvents(runtimeScene);
    rightObstacleBehavior.doStepPreEvents(runtimeScene);

    player.setPosition(200, 300);
    pathFinding.moveTo(runtimeScene, 600, 300 - player.getHeight() / 2);
    expect(pathFinding.pathFound()).to.be(false);
  });

  [20, 30, 60, 120].forEach((framePerSecond) => {
    describe(`(${framePerSecond} fps)`, function () {
      it('can move on the path at the right speed', function () {
        //@ts-ignore
        player.setElapsedTime(1000 / framePerSecond);
        
        const [obstacle, obstacleBehavior] = createObstacleBehavior();

        obstacle.setPosition(600, 300);
        // To ensure obstacles are registered.
       obstacleBehavior.doStepPreEvents(runtimeScene);

        player.setPosition(200, 300);
        pathFinding.moveTo(runtimeScene, 900, 300);
        expect(pathFinding.pathFound()).to.be(true);
        expect(pathFinding.pathFollower.getNodeCount()).to.be.above(
          2
        );

        // Move on the path and stop before the last 1/10 of second.
        for (let i = 0; i < (framePerSecond * 41) / 10; i++) {
          pathFinding.doStepPreEvents(runtimeScene);
          expect(
            pathFinding.pathFollower.destinationReached()
          ).to.be(false);
        }
        // The position is the same no matter the frame rate.
        expect(player.getX()).to.be.within(
          896.606382739383 - epsilon,
          896.606382739383 + epsilon
        );
        expect(player.getY()).to.be.within(
          302.63948009159105 - epsilon,
          302.63948009159105 + epsilon
        );

        // Let 1/10 of second pass,
        // because the calculus interval is not the same for each case.
        for (let i = 0; i < framePerSecond / 10; i++) {
          pathFinding.doStepPreEvents(runtimeScene);
        }
        // The destination is reached for every frame rate within 1/10 of second.
        expect(player.getX()).to.be(900);
        expect(player.getY()).to.be(300);
        expect(pathFinding.pathFollower.destinationReached()).to.be(
          true
        );
      });
    });
  });
});
