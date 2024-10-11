let authState = $state()

export function isAuthenticated() {
	return {
		get authState() {
			return authState
		},
		set authState(value) {
			authState = value
		},
	}
}
