export interface IRefs{
    input: HTMLInputElement | null,
    list: HTMLElement | null,
    info: HTMLElement | null,
}

export interface ICountry{
    name: {
        official: string;
      };
      flags: {
        svg: string;
      };
      capital: string;
      languages: Record<string, string>;
      population: number;
}