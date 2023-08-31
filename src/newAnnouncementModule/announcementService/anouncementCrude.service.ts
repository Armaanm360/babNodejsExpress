import AbstractRouter from "../../abstract/abstract.router";
import AbstractServices from "../../abstract/abstract.service";
import { ICreateNewAnnouncement } from "../utils/announcement.crud.types";



class announcemnetCrudService extends AbstractServices {

  constructor() {
    super();
  }

  public async createAnnouce({ announcement_created_by, announcement_topic, announcemet_text, announcemet_date, announcemet_for }: ICreateNewAnnouncement) {


    const res = await this.db('announcement')
      .insert({ announcement_created_by, announcement_topic, announcemet_text, announcemet_date, announcemet_for });

    if (res.length) {
      return {
        success: true,
        code: 201,
        message: 'Hello Bro',
        data: {
          id: res[0],
        },
      };
    } else {
      return {
        success: false,
        code: 401,
        message: 'meow',
      };
    }


  }

}


export default announcemnetCrudService;