// Type definitions for howler.js 2.2
// Project: https://github.com/goldfire/howler.js
// Definitions by: Pedro Casaubon <https://github.com/xperiments>
//                 Alexander Leon <https://github.com/alien35>
//                 Nicholas Higgins <https://github.com/nicholashza>
//                 Carlos Urango <https://github.com/cjurango>
//                 R.J. <https://github.com/jun-sheaf>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Adapted by arthuro555 for the GDevelop project

declare type HowlBaseCallback = (soundId: number) => void;
declare type HowlErrorCallback = (soundId: number, error?: string) => void;
type HowlCallback = HowlBaseCallback | HowlErrorCallback;

declare interface SoundSpriteDefinitions {
  [name: string]: [number, number] | [number, number, boolean];
}

type HowlErrorEvent = "playerror" | "loaderror";

type HowlBaseEvent =
  | "load"
  | "play"
  | "end"
  | "pause"
  | "stop"
  | "mute"
  | "volume"
  | "rate"
  | "seek"
  | "fade"
  | "unlock";

type HowlEvent = HowlBaseEvent | HowlErrorEvent;

declare interface HowlListeners {
  /**
   * Fires when the sound has been stopped. The first parameter is the ID of the sound.
   */
  onstop?: HowlBaseCallback;

  /**
   * Fires when the sound has been paused. The first parameter is the ID of the sound.
   */
  onpause?: HowlBaseCallback;

  /**
   * Fires when the sound is loaded.
   */
  onload?: HowlBaseCallback;

  /**
   * Fires when the sound has been muted/unmuted. The first parameter is the ID of the sound.
   */
  onmute?: HowlBaseCallback;

  /**
   * Fires when the sound's volume has changed. The first parameter is the ID of the sound.
   */
  onvolume?: HowlBaseCallback;

  /**
   * Fires when the sound's playback rate has changed. The first parameter is the ID of the sound.
   */
  onrate?: HowlBaseCallback;

  /**
   * Fires when the sound has been seeked. The first parameter is the ID of the sound.
   */
  onseek?: HowlBaseCallback;

  /**
   * Fires when the current sound finishes fading in/out. The first parameter is the ID of the sound.
   */
  onfade?: HowlBaseCallback;

  /**
   * Fires when audio has been automatically unlocked through a touch/click event.
   */
  onunlock?: HowlBaseCallback;

  /**
   * Fires when the sound finishes playing (if it is looping, it'll fire at the end of each loop).
   * The first parameter is the ID of the sound.
   */
  onend?: HowlBaseCallback;

  /**
   * Fires when the sound begins playing. The first parameter is the ID of the sound.
   */
  onplay?: HowlBaseCallback;

  /**
   * Fires when the sound is unable to load. The first parameter is the ID of the sound (if it exists) and the second is the error message/code.
   */
  onloaderror?: HowlErrorCallback;

  /**
   * Fires when the sound is unable to play. The first parameter is the ID of the sound and the second is the error message/code.
   */
  onplayerror?: HowlErrorCallback;
}

declare interface HowlOptions extends HowlListeners {
  /**
   * The sources to the track(s) to be loaded for the sound (URLs or base64 data URIs). These should
   * be in order of preference, howler.js will automatically load the first one that is compatible
   * with the current browser. If your files have no extensions, you will need to explicitly specify
   * the extension using the format property.
   *
   * @default `[]`
   */
  src?: string | string[];

  /**
   * The volume of the specific track, from 0.0 to 1.0.
   *
   * @default `1.0`
   */
  volume?: number;

  /**
   * Set to true to force HTML5 Audio. This should be used for large audio files so that you don't
   * have to wait for the full file to be downloaded and decoded before playing.
   *
   * @default `false`
   */
  html5?: boolean;

  /**
   * Set to true to automatically loop the sound forever.
   *
   * @default `false`
   */
  loop?: boolean;

  /**
   * Automatically begin downloading the audio file when the Howl is defined. If using HTML5 Audio,
   * you can set this to 'metadata' to only preload the file's metadata (to get its duration without
   * download the entire file, for example).
   *
   * @default `true`
   */
  preload?: boolean | "metadata";

  /**
   * Set to true to automatically start playback when sound is loaded.
   *
   * @default `false`
   */
  autoplay?: boolean;

  /**
   * Set to true to load the audio muted.
   *
   * @default `false`
   */
  mute?: boolean;

  /**
   * Define a sound sprite for the sound. The offset and duration are defined in milliseconds. A
   * third (optional) parameter is available to set a sprite as looping. An easy way to generate
   * compatible sound sprites is with audiosprite.
   *
   * @default `{}`
   */
  sprite?: {
    [name: string]: [number, number] | [number, number, boolean];
  };

  /**
   * The rate of playback. 0.5 to 4.0, with 1.0 being normal speed.
   *
   * @default `1.0`
   */
  rate?: number;

  /**
   * The size of the inactive sounds pool. Once sounds are stopped or finish playing, they are marked
   * as ended and ready for cleanup. We keep a pool of these to recycle for improved performance.
   * Generally this doesn't need to be changed. It is important to keep in mind that when a sound is
   * paused, it won't be removed from the pool and will still be considered active so that it can be
   * resumed later.
   *
   * @default `5`
   */
  pool?: number;

  /**
   * howler.js automatically detects your file format from the extension, but you may also specify a
   * format in situations where extraction won't work (such as with a SoundCloud stream).
   *
   * @default `[]`
   */
  format?: string[];

  /**
   * When using Web Audio, howler.js uses an XHR request to load the audio files. If you need to send
   * custom headers, set the HTTP method or enable withCredentials (see reference), include them with
   * this parameter. Each is optional (method defaults to GET, headers default to null and
   * withCredentials defaults to false).
   */
  xhr?: {
    method?: string;
    headers?: Record<string, string>;
    withCredentials?: true;
  };
}

declare class Howl {
  constructor(options: HowlOptions);

  play(id?: number | "__default"): number; // .play() is not chainable; the other methods are
  pause(id?: number): this;
  stop(id?: number): this;

  mute(): boolean;
  mute(id: number): boolean;
  mute(muted: boolean, id?: number): this;

  volume(): number;
  volume(id: number): number;
  volume(volume: number, id: number): this;

  fade(from: number, to: number, duration: number, id?: number): this;

  rate(): number;
  rate(id: number): number;
  rate(rate: number, id: number): this;

  seek(): number;
  seek(id: number): number;
  seek(seek: number, id?: number): this;

  loop(): boolean;
  loop(id: number): boolean;
  loop(loop: boolean, id?: number): this;

  playing(id?: number): boolean;
  duration(id?: number): number;
  state(): "unloaded" | "loading" | "loaded";
  load(): this;
  unload(): void;

  on(event: "load", callback: () => void, id?: number): this;
  on(event: HowlErrorEvent, callback: HowlErrorCallback, id?: number): this;
  on(event: HowlBaseEvent, callback: HowlBaseCallback, id?: number): this;
  on(event: string, callback: HowlCallback, id?: number): this;

  once(event: "load", callback: () => void, id?: number): this;
  once(event: HowlErrorEvent, callback: HowlErrorCallback, id?: number): this;
  once(event: HowlBaseEvent, callback: HowlBaseCallback, id?: number): this;
  once(event: string, callback: HowlCallback, id?: number): this;

  off(event: "load", callback?: () => void, id?: number): this;
  off(event: HowlErrorEvent, callback?: HowlErrorCallback, id?: number): this;
  off(event: HowlBaseEvent, callback?: HowlBaseCallback, id?: number): this;
  off(event?: string, callback?: HowlCallback, id?: number): this;

  stereo(pan: number, id?: number): this | void;
  pos(x: float, y: float, z: float, id: integer): this;
  pos(id: integer): [float, float, float];
  orientation(
    x: number,
    y: number,
    z: number,
    xUp: number,
    yUp: number,
    zUp: number
  ): this | void;
  pannerAttr(
    o: {
      coneInnerAngle?: number;
      coneOuterAngle?: number;
      coneOuterGain?: number;
      distanceModel: "inverse" | "linear";
      maxDistance: number;
      panningModel: "HRTF" | "equalpower";
      refDistance: number;
      rolloffFactor: number;
    },
    id?: number
  ): this;
}

declare interface Howler {
  stop(): this;
  mute(muted: boolean): this;
  volume(): number;
  volume(volume: number): this;
  codecs(ext: string): boolean;
  unload(): this;
  usingWebAudio: boolean;
  html5PoolSize: number;
  noAudio: boolean;
  autoUnlock: boolean;
  autoSuspend: boolean;
  ctx: AudioContext;
  masterGain: GainNode;

  stereo(pan: number): this;
  pos(x: number, y: number, z: number): this | void;
  orientation(
    x: number,
    y: number,
    z: number,
    xUp: number,
    yUp: number,
    zUp: number
  ): this | void;
}

declare const Howler: Howler;
