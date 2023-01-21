export default function (context) {
    context.$axios.onRequest((config) => {
        config.baseURL = process.env.API
        config.headers.common['Authorization'] = `MS ${context.$cookies.get('token')}`
    })

    context.$axios.onError((error) => {
        //   Sending the toast messages.
        context.$toast.clear();
        context.$toast.error(error.response.data.message ? error.response.data.message : error)

        //   Once user Unauthorized then moved them to login page.
        if (error.response.status === 403) {
            context.$cookies.remove('token')
            context.app.router.push('/login')
        }

        return false
    })
}