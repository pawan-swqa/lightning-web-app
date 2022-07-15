

const filterLightningData = async (data , filters) => {
    let filterData = []
    let filterData1 = []
    let filterData2 = [];
    let finalFilterData = []
   for(let i=0; i < data.length; i++) {
    if(Date.parse(data[i].properties.time) >= Date.parse(filters.fromDate)) {
        filterData.push(data[i]);
    }
   }
   for(let j=0; j < filterData.length; j++) {
    if(Date.parse(filterData[j].properties.time) <= Date.parse(filters.todate)) {
        filterData1.push(filterData[j]);
    }
   }
   for(let K=0; K < filterData1.length; K++) {
    if(filterData1[K].properties.intensity >= filters.intensityFrom && filterData1[K].properties.intensity <= filters.intensityTo) {
        filterData2.push(filterData1[K])
    }
   }
   for(let l=0; l < filterData2.length; l++) {
       if(filterData2[l].isCloudToCloud === filters.isCloudToCloud) {
           finalFilterData.push(filterData2[l])
       }
   }
   return filterData2;
};

export { filterLightningData };
