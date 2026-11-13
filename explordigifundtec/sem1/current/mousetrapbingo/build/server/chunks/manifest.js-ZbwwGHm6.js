const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.JReyq9Yu.js",app:"_app/immutable/entry/app.D_QNQ407.js",imports:["_app/immutable/entry/start.JReyq9Yu.js","_app/immutable/chunks/DvVQD3gv.js","_app/immutable/chunks/3hy9agFo.js","_app/immutable/chunks/RzfZt-WM.js","_app/immutable/entry/app.D_QNQ407.js","_app/immutable/chunks/DvVQD3gv.js","_app/immutable/chunks/-lnI0AcK.js","_app/immutable/chunks/D-T-BJi9.js","_app/immutable/chunks/RzfZt-WM.js","_app/immutable/chunks/Ca8c0X5-.js","_app/immutable/chunks/84TZfMDv.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./0-Cy6AXMBw.js')),
			__memo(() => import('./1---jjBKDU.js')),
			__memo(() => import('./2-BBCTV-i7.js')),
			__memo(() => import('./3-CxLqR0kz.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-ZbwwGHm6.js.map
