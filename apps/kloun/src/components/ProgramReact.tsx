import React, { LegacyRef, useEffect, useRef, useState } from 'react';

export interface Item {
    id: number;
    promoted: number;
    userId: number;
    up: number;
    down: number;
    created: number;
    image: string;
    thumb: string;
    fullsize: string;
    width: number;
    height: number;
    audio: boolean;
    source: string;
    flags: number;
    user: string;
    mark: number;
    gift: number;
}

export interface RootObject {
    atEnd: boolean;
    atStart: boolean;
    items: Item[];
    ts: number;
    cache: string;
    rt: number;
    qc: number;
}

const ProgramReact = ({ limit, className }: { limit?: number; className: string }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [img, setImg] = useState<string | null>(null);
    const checkboxRef: LegacyRef<HTMLInputElement> = useRef(null);

    useEffect(() => {
        const handleChange = () => {
            if (checkboxRef.current) {
                console.log(checkboxRef.current.checked);
                if (!checkboxRef.current.checked) {
                    setImg(null);
                    document.body.style.overflow = "auto";
                } else {
                    document.body.style.overflow = "hidden";
                }
            }
        };

        if (checkboxRef.current) {
            checkboxRef.current.addEventListener("change", handleChange);
        }
        return () => {
            if (checkboxRef.current) {
                checkboxRef.current.removeEventListener("change", handleChange);
            }
        };
    }, [checkboxRef]);
    async function fetchMyAPI(older?: number) {
        const res2 = await fetch(
            `https://img_proxy.monastro.workers.dev/${older ? `&older=${older}` : ""
            }`
        );
        console.log(res2)
        const response = await res2.json();

        if (older) {
            setItems((itemz) => itemz.concat(response.items));
            // setItem(response.data.items[response.data.items.length - 1].promoted);
        } else {
            setItems(response.items);
            //  setItem(response.data.items[response.data.items.length - 1].promoted);
        }
    }

    useEffect(() => {
        // initial fetch
        console.log('initx')
        fetchMyAPI();
    }, []);

    if (!items) {
        return <div>Loading...</div>;
    }

    return (
        <div className={className}>

            {items
                .slice(0, limit || items.length)
                .map(
                    ({
                        thumb,
                        id,
                        image,
                    }: {
                        thumb: string;
                        fullsize?: string;
                        image?: string;
                        id: number;
                        promoted: number;
                    }) => (
                        <label
                            key={id}
                            className="hover:animate-pulse snap-center"
                            htmlFor="my-modal"
                            onClick={() => setImg(`${image}`)}
                        >
                            <div className="rounded-lg bg-gradient-to-r from-purple-900 to-pink-600 p-1 dark:from-white dark:to-slate-400 m-1 cursor-pointer flex">
                                <img
                                    width="128"
                                    height="128"
                                    className="rounded-lg"

                                    alt="pr0gramm"
                                    src={`https://thumb.pr0gramm.com/${thumb}`}
                                />
                            </div>
                        </label>
                    )
                )}

            <input
                type="checkbox"
                id="my-modal"
                className="invisible"
                ref={checkboxRef}
            />
            {img && (
                <label
                    htmlFor="my-modal"
                    className="cursor-pointer fixed top-0 left-0 w-screen h-screen  z-60 flex justify-center items-center backdrop-blur-md bg-black/30"
                >
                    <div className="w-3/4  flex items-center justify-center">
                        {img?.includes("mp4") ? (
                            <video
                                controls
                                autoPlay
                                className="z-50 aspect-auto max-h-screen rounded-md w-auto border-4  border-black"
                            >
                                <source src={"https://vid.pr0gramm.com/" + img} />
                            </video>
                        ) : (
                            <img
                                src={"https://img.pr0gramm.com/" + img}
                                alt=""
                                className="aspect-auto max-h-screen rounded-md border-4  border-black z-50"
                            />
                        )}
                    </div>
                </label>
            )}
        </div>
    );
};
export default ProgramReact;
