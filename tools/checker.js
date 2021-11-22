exports.CheckFullName = async function(checkThis, fullName) {
	let found = false

	if (checkThis.length) {
		for (let i = 0; i < checkThis.length; i++) {
			if (checkThis[i].full_name == fullName) {
				found = true
			}
		}
	}

	return found
}