import express from "express";
import { queryDriversOfReserve } from "../query/reserve.drivers.js";

export function getDataFn() {
  return dataFn;
}
let dataFn;
export function passengerReservationRouter(DB, sequelize = null) {
  const passengerReservationRouter = express.Router();

  passengerReservationRouter.post("/", async (req, res) => {
    try {
      const newReservation = await DB.PassengerReservation.create(req.body);

      let idReserve = newReservation.dataValues.id;

      dataFn = await queryDriversOfReserve(sequelize, idReserve);

      return res.json(newReservation);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  passengerReservationRouter.get("/", async (req, res) => {
    try {
      const reservations = await DB.PassengerReservation.findAll({
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
      const reservation = await DB.PassengerReservation.findByPk(
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
      const reservation = await DB.PassengerReservation.findByPk(
        reservation_id
      );
      if (!reservation) {
        return res
          .status(404)
          .json({ message: `Reservation with id ${reservation_id} not found` });
      }

      await reservation.update(req.body);

      return res.json(reservation);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  passengerReservationRouter.delete("/:reservation_id", async (req, res) => {
    const { reservation_id } = req.params;

    try {
      const reservation = await DB.PassengerReservation.findByPk(
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
