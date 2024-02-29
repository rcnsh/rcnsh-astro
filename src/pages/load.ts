export const get = async function () {
    await fetch('https://rcn.sh');
    return {
        status: 200,
        headers: new Headers(),
        ok: true,
        redirected: false,
        statusText: 'OK',
    };
}
