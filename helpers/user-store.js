import Cookies from 'js-cookie'


const SaveUser = (user) => {
    Cookies.set('user', JSON.stringify(user), { expires: 7 });
}

const RemoveUser = () => {
    Cookies.remove('user')
}

const GetUser =  () => {
    var u = Cookies.get('user');
    try {
        u = JSON.parse(u);
    } catch {
        return null
    }
    return u;
}

export { GetUser, SaveUser, RemoveUser }