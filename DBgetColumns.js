const sendQuery = require('./DBsendQuery');
module.exports = (table, columNameKnown_or_s, valueKnown_or_s, column_sWillBeGot, QUERY_group_by, QUERY_order_by, QUERY_limit, QUERY_WHERE_bt_or_lt, QUERY_WHERE_isUnsafe) => {
    if (!Array.isArray(columNameKnown_or_s)){
        columNameKnown_or_s = [columNameKnown_or_s];
    }

    if (!Array.isArray(valueKnown_or_s)){
        valueKnown_or_s = [valueKnown_or_s];
    }

    return new Promise(resolve => {
        // console.log("table, columNameKnown_or_s, valueKnown_or_s, column_sWillBeGot, QUERY_group_by, QUERY_order_by, QUERY_limit", table, columNameKnown_or_s, valueKnown_or_s, column_sWillBeGot, QUERY_group_by, QUERY_order_by, QUERY_limit);
        // console.log(`select ${column_sWillBeGot.join(', ')} from ${table} where ${
        //     columNameKnown_or_s.filter((columnName, columnNameIndex) => valueKnown_or_s[columnNameIndex] != null).map(columnNameItem => {
        //         return `\`${columnNameItem}\` = ?`;
        //     }).join(" and ")
        // }${QUERY_group_by ? (" group by " + QUERY_group_by) : ""}${QUERY_order_by ? (" order by " + QUERY_order_by) : ""}
        // ${QUERY_limit ? (" limit " + QUERY_limit) : ""}
        // ;`, "columNameKnown_or_s:", columNameKnown_or_s, "valueKnown_or_s:", valueKnown_or_s, "from DBgetColumns");

        // QUERY_WHERE_bt_or_lt : [["any_colums", "bt"], ["any_other_column", "lt"]]
        console.log({QUERY_WHERE_bt_or_lt});
        sendQuery(`select ${column_sWillBeGot.join(', ')} from ${table} where ${
            columNameKnown_or_s.filter((columnName, columnNameIndex) => ( Array.isArray(valueKnown_or_s) ? valueKnown_or_s : [valueKnown_or_s] )[columnNameIndex] != null).map(columnNameItem => {
                return `${ (QUERY_WHERE_isUnsafe == true) ? '' : '\`' }${columnNameItem}${ (QUERY_WHERE_isUnsafe == true) ? '' : '\`' } ${QUERY_WHERE_bt_or_lt ? ( QUERY_WHERE_bt_or_lt.find(_=> _[0] == columnNameItem ) ? ( 
                    ( ( (QUERY_WHERE_bt_or_lt.find(_=> _[0] == columnNameItem )[1]) == "bt" ) ? '>' : 
                        ( ( (QUERY_WHERE_bt_or_lt.find(_=> _[0] == columnNameItem )[1]) == "lt" ) ? '<' : '' )
                    )
                    
                 ) : '=' ) : '='} ?`;
            }).join(" and ")
        }${QUERY_group_by ? (" group by " + QUERY_group_by) : ""}${QUERY_order_by ? (" order by " + QUERY_order_by) : ""}
        ${QUERY_limit ? (" limit " + QUERY_limit) : ""}
        ;`,
        ( Array.isArray(valueKnown_or_s) ? valueKnown_or_s : [valueKnown_or_s] ).filter(value => value != null)
        ).then(result => {

            if (result.result == false){
                resolve(false);
            }
            if (result.result.length != 0){
                result.result = JSON.stringify(result.result);
                result.result = JSON.parse(result.result);
                // console.log("result.result");
                // console.log(result.result);
                //result.result = Object.values(result.result[0])[0];        

            } else {
                result.result = false;
            }
            result.connection.end();
            resolve(result.result);

            
            
            
        });
    });

}