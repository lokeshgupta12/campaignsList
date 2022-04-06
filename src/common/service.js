// common method for mapping userData and CampListData
export function mapCampListData(userData, campData) {
    return campData.map((rowdata) => {
        const index = userData.findIndex((resData) => resData.id === rowdata.userId)
        return {
          id: rowdata.id,
          userid: rowdata.userId,
          startDate: rowdata.startDate,
          endDate: rowdata.endDate,
          budget: rowdata.Budget,
          name: rowdata.name,
          username : index >=0 ? userData[index].username : 'Unknown User'
        }
      })
}