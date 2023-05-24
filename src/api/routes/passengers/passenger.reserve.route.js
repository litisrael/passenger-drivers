import express from "express";
import { queryDriversOfReserve } from "../../query/reserve.drivers.js";

// export async function getDataFromQuery() {
//   return await dataFromQuery;
// }
let dataFromQuery;

export function passengerReservationRouter(DB, sequelize = null) {
  const passengerReservationRouter = express.Router();

  passengerReservationRouter.post("/", async (req, res) => {
    try {
      const newReservation = await DB.passengers.passengerReservationTourist.create(req.body);

      const idReserve = newReservation.dataValues.id;

      dataFromQuery = await queryDriversOfReserve(sequelize, idReserve);

      return res.json({newReservation ,  dataFromQuery});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  passengerReservationRouter.get("/", async (req, res) => {
    try {
      const reservations = await DB.passengers.passengerReservationTourist.findAll({
        attributes: [
          "id",
          "number_of_passengers",
          "start_day",
          "end_day",
          "km_total",
        ],
      });
      return res.json(reservations);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  passengerReservationRouter.get("/:reservation_id", async (req, res) => {
    const { reservation_id } = req.params;

    try {
      const reservation = await DB.passengers.passengerReservationTourist.findByPk(
        reservation_id
      );
      if (!reservation) {
        return res
          .status(404)
          .json({ message: `Reservation with id ${reservation_id} not found` });
      }
      return res.json(reservation);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  passengerReservationRouter.put("/:reservation_id", async (req, res) => {
    const { reservation_id } = req.params;

    try {
      const reservation = await DB.passengers.passengerReservationTourist.findByPk(
        reservation_id
      );
      if (!reservation) {
        return res
          .status(404)
          .json({ message: `Reservation with id ${reservation_id} not found` });
      }

      await reservation.update(req.body);
      //  datafn es la funcion que hace el join
       dataFromQuery = await queryDriversOfReserve(sequelize, reservation_id);

      return res.json({reservation,  dataFromQuery});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  passengerReservationRouter.delete("/:reservation_id", async (req, res) => {
    const { reservation_id } = req.params;

    try {
      const reservation = await DB.passengers.passengerReservationTourist.findByPk(
        reservation_id
      );
      if (!reservation) {
        return res
          .status(404)
          .json({ message: `Reservation with id ${reservation_id} not found` });
      }

      await reservation.destroy();

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  return passengerReservationRouter;
}
