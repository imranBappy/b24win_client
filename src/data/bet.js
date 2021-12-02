const columns = () =>([
    { 
        id: 'createdAt', 
        label: 'Date', 
        minWidth: 170 ,
    },
    { 
        id: 'amount', 
        label: 'Amount', 
        minWidth: 80 ,
    },
    { 
        id: 'game', 
        label: 'Game', 
        minWidth: 350 ,
    },
    { 
        id: 'bet', 
        label: 'Bet', 
        minWidth: 150 ,
    },
    { 
        id: 'result', 
        label: 'Result', 
        minWidth: 100 ,
    },
    { 
        id: 'rate', 
        label: 'Rate', 
        minWidth: 80 ,
    },
    { 
        id: 'wining', 
        label: 'Possible Winning', 
        minWidth: 80 ,
    },
    { 
        id: 'status', 
        label: 'Status', 
        minWidth: 80 ,
    },
]);
  
  export default columns
  