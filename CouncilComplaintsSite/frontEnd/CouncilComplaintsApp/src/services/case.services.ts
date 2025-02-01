import http from "../http-common";
import ITutorialData from "../types/cases.type"

class TutorialDataService {
  create(data: ITutorialData) {
    return http.post<ITutorialData>("/cases", data);
  }

export default new TutorialDataService();