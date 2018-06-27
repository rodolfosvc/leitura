const sortFunc = (arr, prop, asc) => {
  if(prop){
    var arrCopy = arr.slice()
    arrCopy.sort((e1, e2) => {
      if(e1[prop] === e2[prop])
        return 0
      else if(e1[prop] < e2[prop])
        return asc ? -1 : 1
      else
        return asc ? 1 : -1 //e1[prop] > e2[prop]
    })
    return arrCopy
  }
  return arr
}


const CONST = {
  SORT_BY: {
    POST_OPTIONS: {
      SCORE_ASC: {
        VALUE: 0,
        PROP: 'voteScore',
        TEXT: 'Vote Score (Low to Hight)',
        ASC: true
      },
      SCORE_DESC: {
        VALUE: 1,
        PROP: 'voteScore',
        TEXT: 'Vote Score (Hight to Low)',
        ASC: false
      },
      DATE_ASC: {
        VALUE: 2,
        PROP: 'timestamp',
        TEXT: 'Date (Low to Hight)',
        ASC: true
      },
      DATE_DESC: {
        VALUE: 3,
        PROP: 'timestamp',
        TEXT: 'Date (Hight to Low)',
        ASC: false
      }
    },
    FUNC: sortFunc
  }
}

export default CONST