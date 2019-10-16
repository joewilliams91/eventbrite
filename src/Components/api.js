import axios from "axios";

const request = axios.create({
  baseURL: "https://www.eventbriteapi.com/v3/events/search/"
});

export const getEvents = async params => {  
  const { data } = await request.get(`?sort_by=date&location.address=manchester&start_date.range_start=${params.start_date}&start_date.range_end=${params.end_date}&token=VBUSKKCQ2VTXKPOP34PX`);
  return data;
};