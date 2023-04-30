

export async function get({ params }: { params: { id: string } }) {
    //const { id } = params;
    const d = {
        promoted: "https://pr0gramm.com/api/items/get?flags=1&promoted=1"
    }
    // const response = await fetch(d[id]);
    // return json 

    const response = await fetch(d.promoted);
    const data = await response.json();
    return {
        body: JSON.stringify(data),
    };

}