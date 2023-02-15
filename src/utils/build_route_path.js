
export function buildRoutePath(path){
    const routeParamsRegex = /:([a-zA-Z]+)/g;
    const pathParams = path.replaceAll(routeParamsRegex,'?<$1>([a-z0-9\-_]+)')

    // console.log(Array.from(path.matchAll(routeParamsRegex)));
    const pathNewRegex = new RegExp(`^${pathParams}`)

    return pathNewRegex;

}