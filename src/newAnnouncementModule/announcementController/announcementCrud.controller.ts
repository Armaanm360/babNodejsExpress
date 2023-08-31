import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import { ICreateNewAnnouncement } from './../utils/announcement.crud.types';
import announcemnetCrudService from './../announcementService/anouncementCrude.service';




class announcementCrudController extends AbstractController {
  //get all announcements
  private announcemnetCrudService = new announcemnetCrudService();
  public getAllAnouncements = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {

      res.send('Hoise Bro');

    }
  );

  //create announcements

  public createAnouncement = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {

      const { announcement_created_by, announcement_topic, announcemet_text, announcemet_date, announcemet_for } = req.body as ICreateNewAnnouncement;

      const { code, ...data } = await this.announcemnetCrudService.createAnnouce({
        announcement_created_by, announcement_topic, announcemet_text, announcemet_date, announcemet_for
      });


      res.status(code).json(data);

    }
  );






}

export default announcementCrudController;