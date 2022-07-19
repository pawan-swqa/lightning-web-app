const filterLightningData = async (data, filters) => {
    let filterData = [];
    let filterData1 = [];
    let filterData2 = [];
    // let filterData3 = [];
    let finalFilterData = [];
    for (let i = 0; i < data.length; i++) {
        if (Date.parse(data[i].properties.time) >= Date.parse(filters.fromDate)) {
            filterData.push(data[i]);
        }
    }
    for (let j = 0; j < filterData.length; j++) {
        if (
            Date.parse(filterData[j].properties.time) <= Date.parse(filters.todate)
        ) {
            filterData1.push(filterData[j]);
        }
    }
    for (let K = 0; K < filterData1.length; K++) {
        if (
            filterData1[K].properties.intensity >= filters.intensityFrom &&
            filterData1[K].properties.intensity <= filters.intensityTo
        ) {
            filterData2.push(filterData1[K]);
        }
    }
    for (let l = 0; l < filterData2.length; l++) {
        if (filterData2[l].properties.isCloudToCloud === filters.isCloudToCloud) {
            finalFilterData.push(filterData2[l]);
        }
    }
    // for (let m = 0; m < filterData3.length; l++) {
    //     const bb = filters.boundingBox;
    //     if (bb.minX === 0 && bb.maxX === 0 && bb.minY === 0 && bb.maxY === 0) {
    //         finalFilterData.push(filterData3[l]);
    //     } else {
    //         const [x , y] = data[i].geometry.coordinates;
    //         if(x < bb.maxX && x > bb.minX && y < bb.maxY && y > bb.minY) {
    //             finalFilterData.push(filterData3[l]);
    //         }
    //     }
    // }
    // isInsideBoundingBox(data[i].geometry.coordinates, filters.boundingBox)
    return finalFilterData;
};

const filterHighLightedData = async (data, date) => {
    let filteredData = [];
    const Sdate = date.setHours(0, 0, 0, 0);
    for (let i = 0; i < data.length; i++) {
        const Cdate = new Date(data[i].properties.time).setHours(0, 0, 0, 0);
        if (Cdate === Sdate) {
            filteredData.push(data[i]);
        }
    }
    return filteredData;
};

const filterDataByRows = async (data, rows) => {
    const filterData = [];
    const dataTableData = []
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < rows.length; j++) {
            if (
                data[i].properties.intensity === rows[j].intensity &&
                data[i].properties.isCloudToCloud === rows[j].isCloudToCloud &&
                data[i].properties.time === rows[j].time
            ) {
                filterData.push(data[i]);
                dataTableData.push(data[i].properties);
            }
        }
    }

    return {
        dataTableData: dataTableData,
        filteredData: filterData,
    };
};

const isInsidePolygon = (polyPoints , markers) => {
        let [x , y] = markers;
        var inside = false;
        for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
            var xj = polyPoints[j].lat, yj = polyPoints[j].lng;
            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
}

const filterByPolygonSelection = (data , polypoints) => {
    let filteredData = [];
    for(let i=0; i < data.length; i++) {
        const points = [data[i].geometry.coordinates[0] , data[i].geometry.coordinates[1]];
        const isInside = isInsidePolygon(polypoints , points);
        if(isInside) {
            filteredData.push(data[i]);
        }
    }
    return filteredData;
}

export { filterLightningData, filterHighLightedData, filterDataByRows , filterByPolygonSelection };
