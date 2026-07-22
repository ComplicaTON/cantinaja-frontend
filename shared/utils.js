export function dom_press (html, father_id){
    const container = document.getElementById(father_id)
    container.insertAdjacentHTML("afterbegin", html)
}