declare namespace JSX {
    interface IntrinsicElements {
        "amp-ad": {
            type: string;
            width: string;
            height: string;
            class: string;
            "data-ad-client": string;
            "data-ad-slot": string;
            "data-auto-format": string;
            "data-full-width": string;
            children?: JSX.Element;
            dangerouslySetInnerHTML?: { __html: string };
        };
        "amp-video": {
            controls?: boolean;
            autoPlay?: boolean;
            layout: string;
            children?: JSX.Element;
            className: string;

        };
        "amp-img": {
            src?: string;
            width?: string;
            height?: string;
            layout?: string;
            alt: string;
            class?: string;
            style?: { [elemName: string]: string | number };
        };
        script: { src: string; "custom-element"?: string; async?: boolean | string };

        [elemName: string]: React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        > & {
            overflow?: string;
        };
        div: React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        > & {
            overflow?: string;
        };
    }
}
