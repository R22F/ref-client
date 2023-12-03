export const hasToken = () => {
    return localStorage.getItem("Authorization")!==null
}