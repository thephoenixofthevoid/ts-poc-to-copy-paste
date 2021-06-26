interface Types { 
  string: string;
  number: number;
}

type Get<M, K> = K extends keyof M ? M[K] : never;

type Of<S, P = {}> = 
    S extends `{${infer N}:${infer T}}` ? P & { [k in N]: Get<Types, T> } :
    S extends `{${infer N}}`            ? P & { [k in N]: string } 
                                        : P

type Params<R, P = {}> = R extends `${infer S}/${infer T}` ? 
     Params<T, Of<S, P>> : Of<R, P>

type Endpoint<Verb, Path> = { 
    verb: Verb, 
    path: Path, 
    vars: Params<Path> 
}

type Route<S> = 
    S extends `${infer V} /${infer P}` ? Endpoint<V, P> : 
    S extends /*  GET  */`/${infer P}` ? Endpoint<"GET", P> : never;
