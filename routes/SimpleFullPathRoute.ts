type RouteSegmentDetectType<Segment extends string> = 
    Segment extends `{${infer Name}:string}` ? { [K in Name]: string } :
    Segment extends `{${infer Name}:number}` ? { [K in Name]: number } :
    Segment extends `{${infer Name}:bigint}` ? { [K in Name]: bigint } :
    Segment extends `{${infer Name}}` ? { [K in Name]: string } :
                                                       Segment;

type RouteSegments<Route extends string, Segments extends string[] = []> = 
    Route extends `/${infer Segment}/${infer Tail}` ? 
                        RouteSegments<`/${Tail}`, [ ...Segments, RouteSegmentDetectType<Segment> ]> :
    Route extends `/${infer Segment}` ? 
                        RouteSegments<``, [ ...Segments, RouteSegmentDetectType<Segment> ]> : 
    Segments;

type FullPath<Route extends string> = 
    Route extends `GET ${infer T}` ? { GET: RouteSegments<T> } :
    Route extends `PUT ${infer T}` ? { PUT: RouteSegments<T> } :
    Route extends `DEL ${infer T}` ? { DEL: RouteSegments<T> } :
    Route extends `POST ${infer T}` ? { POST: RouteSegments<T> } :
    Route extends `HEAD ${infer T}` ? { HEAD: RouteSegments<T> } :
                                     { GET: RouteSegments<Route> }
