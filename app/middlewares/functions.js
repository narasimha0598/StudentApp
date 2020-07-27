module.exports = {
    netprice: (price, discount) => {
        return price*(100-discount)/100;
    },
    escaperegex: (text) => {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },
    removeDups: (names) => {
        let unique = {};
        names.forEach(function(i) {
          if(!unique[i]) {
            unique[i] = true;
          }
        });
        return Object.keys(unique);
    }
}