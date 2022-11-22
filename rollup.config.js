import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";

export default [
	{
		input: 'src/index.ts',
		output: {
			name: 'NavMeshGDevelopExtension',
			format: 'umd',
			file: 'dist/NavMeshGDevelopExtension.js',
			sourcemap: true,
		},
		plugins: [typescript()],
	},
	{
		input: "src/index.ts",
		output: [{ file: "dist/NavMeshGDevelopExtension.d.ts", format: "umd" }],
		plugins: [dts()],
	}
];