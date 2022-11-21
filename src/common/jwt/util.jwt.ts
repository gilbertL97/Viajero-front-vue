export const jwtDecode = function (t: any) {
    const token: any = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return token;
};

export function extract_user_data(name: string, token: string) {
    const user_data = jwtDecode(token).payload;
    return { [name]: user_data.sub, ...user_data };
}
