export default function HandleSpaceOnSearchBar(search) {

    let res = search.replace(" ", "~*-");
    return res;
}