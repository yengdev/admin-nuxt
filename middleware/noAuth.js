export default function (context) {
	// If the user is not authenticated
	if (context.$cookies.get('token')) {
		return context.redirect('/');
	}
}