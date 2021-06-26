interface Types {
    string: string,
    number: number,
    shit: { some: "shit" }
}

type ExtractParam<S extends string> = 
    S extends `{${infer N}:${infer T}}` ? { [K in N]: T extends keyof Types ? Types[T] : never } :
    S extends `{${infer N}}`            ? { [K in N]: string } : {}

type Update<Parameters, Segment extends string> = Parameters & ExtractParam<Segment>

type ExtractParams<R extends string, P extends object = {}> = 
    R extends `/${infer S}/${infer Tail}` ? ExtractParams<`/${Tail}`, Update<P, S>> :
    R extends `/${infer S}`               ? ExtractParams<"",         Update<P, S>> : P;

type FullPath<Route extends string> = 
    Route extends `${infer Verb} ${infer Path}` ? 
        { verb: Verb, path: Path, vars: ExtractParams<Path> } : FullPath<`GET ${Route}`>;
