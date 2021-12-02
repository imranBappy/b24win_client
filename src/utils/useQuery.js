function useQuery(useLocation){
    return new URLSearchParams(useLocation().search);
}
export default useQuery
