const express = require("express");
const bcrypt = require("bcrypt");
const salt_rounds = 11;
const parser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");
const locations = require("./utility/objects");
const app = express();

app.use(parser.json());
app.use(cors());

const clientConfig = {
  user: "postgres",
  host: "localhost",
  database: "reservation",
  password: "admin",
  port: 5432,
};

// Function to create a new database client instance
function createClient() {
  return new Client(clientConfig);
}

// apis
app.get("/getLocations", async (req, res) => {
  const client = createClient();
  try {
    await client.connect();

    const locationRows = await client.query("select * from locations order by location_id asc;");

    res.status(200).send({
      statusMsg: "success",
      data: locationRows.rows,
    });
  } catch (error) {
    console.error("Internal server error");
    res.status(500).send({
      statusMsg: "failed",
    });
  } finally {
    await client.end();
  }
});

app.get("/api/getLocation/:id", async(req,res)=> {
  const client = createClient();
  const location_id = req.params.id
  console.log(location_id)
  try {
    await client.connect();
    const locationRow = await client.query("select * from locations where location_id = $1",[parseInt(location_id)]);
    if (locationRow.rows.length > 0) {
      res.status(200).send({
          status: 'success',
          data: locationRow.rows[0]
      });
  } else {
      res.status(404).send({
          status: 'failed',
          statusMsg: "Location not found"
      });
  }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'failed',
      statusMsg:"Interal server error"
    })
  } finally {
    await client.end()
  }
})

app.put("/api/updateLocation/:id", async(req,res) => {
  console.log(req.body)
  const {location_name, location_street_address, location_city, location_state, location_zipcode, exception_dates} = req.body;
  const client = createClient();
  const location_id = req.params.id

  try {
    await client.connect();

    const update = await client.query("Update locations SET location_name = $1, location_street_address = $2, location_city = $3, location_state = $4, location_zipcode = $5, exception_dates = $6 WHERE location_id = $7 RETURNING *", [location_name, location_street_address, location_city, location_state,location_zipcode, exception_dates, location_id])
    if(update.rows.length > 0) {
      res.status(200).send({
        status: 'Success',
        data: update.rows[0]
      })
    }

  } catch (error) {
    console.error(error)
    res.status(500).send({
      status: "failed",
      statusMsg: "Internal server error"
    })
  } finally {
    await client.end()
  }
})

app.get("/api/getAppointment/:id", async(req,res)=> {
  const client = createClient()
  const appointment_id = req.params.id;
  console.log('appointment_id', appointment_id)
  try {
    await client.connect();

    const appointmentRow = await client.query("SELECT * FROM appointments WHERE appointment_id = $1",[appointment_id]);
    if(appointmentRow.rows.length > 0) {
      res.status(200).send({
        status:"success",
        data: appointmentRow.rows[0]
      })
    } else {
      res.status(404).send({
          status: 'failed',
          statusMsg: "Appointment not found"
      });
  }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'failed',
      statusMsg: 'Internal server error'
    })
  } finally {
    await client.end()
  }
})
app.put("/api/updateAppointment/:id", async (req, res) => {
  const {appointment_title, appointment_time, appointment_dates,appointment_duration, appointment_type, appointment_status, appointment_reservations, appointment_max_reservations} = req.body
  const client = createClient();
  const appointment_id = req.params.id;
  try {
    await client.connect();
    const update = await client.query("UPDATE appointments SET appointment_title = $1, appointment_time = $2, appointment_dates = $3, appointment_duration = $4, appointment_type = $5, appointment_status = $6, appointment_max_reservations = $7, appointment_reservations = $8 WHERE appointment_id = $9 RETURNING *", [appointment_title,appointment_time, appointment_dates, appointment_duration,appointment_type, appointment_status, parseInt(appointment_max_reservations), parseInt(appointment_reservations), parseInt(appointment_id)])

    if(update.rows.length > 0) {
      res.status(200).send({
        status:"success",
        data: update.rows[0]
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status:"failed",
      statusMsg: "Intenal server error"
    })
  } finally {
    await client.end()
  }
})
app.get("/getAppointments", async (req, res) => {
  const client = createClient();
  const location_id = req.query.location_id;
  console.log(location_id);
  try {
    await client.connect();

    const AppointmentRows = await client.query(
      "SELECT * FROM appointments WHERE location_id = $1 order by appointment_id asc;",
      [location_id]
    );

    res.status(200).send({
      statusMsg: "success",
      data: AppointmentRows.rows,
    });
  } catch (error) {
    console.error("Internal server error");
    res.status(500).send({
      statusMsg: "failed",
    });
  } finally {
    await client.end();
  }
});

app.post("/api/createReservation", async (req, res) => {
  console.log(req.body);
  const {
    reservation_location,
    reservation_date,
    reservation_time,
    reservation_type,
    reservation_duration,
    reservation_given_name,
    reservation_surname,
    reservation_phone_number,
    reservation_zipcode,
  } = req.body;

  const client = createClient();
  const formated_reservation_date = new Date(reservation_date);
  try {
    //connect to the db
    await client.connect();
    // grab client_id from client table matching columns to retrive client_id
    const client_id = await client.query(
      "select client_id from clients where client_surname = $1 and client_phone_number = $2 and client_zipcode = $3",
      [reservation_surname, reservation_phone_number, reservation_zipcode]
    );
    console.log(client_id);
    if (client_id.rows.length === 0) {
      console.log("client not found creating client...");
      //insert client if not found and then pull new client id
      const insert_client = await client.query(
        "insert into clients(client_given_name, client_surname, client_phone_number, client_zipcode) values($1,$2,$3,$4) RETURNING *",
        [
          reservation_given_name,
          reservation_surname,
          reservation_phone_number,
          reservation_zipcode,
        ]
      );
      const new_client_id = await client.query(
        "select client_id from clients where client_surname = $1 and client_phone_number = $2 and client_zipcode = $3",
        [reservation_surname, reservation_phone_number, reservation_zipcode]
      );
      //insert reservation below
      const insert_reservation_2 = await client.query(
        "insert into reservations (reservation_date, reservation_time, reservation_type, reservation_location, reservation_duration, client_id) values($1,$2,$3,$4,$5,$6)",
        [
          formated_reservation_date,
          reservation_time,
          reservation_type,
          reservation_location,
          reservation_duration,
          new_client_id.rows[0].client_id,
        ]
      );
      await client.end();
      res.status(201).json({
        message: "Reservation created successfully.",
      });
    }
    //check if client already has reservation (only returning client)
    const check_reservation = await client.query(
      "select * from clients c join reservations r on c.client_id = r.client_id where c.client_id = $1 ",
      [client_id.rows[0].client_id]
    );
    if (check_reservation.rows.length > 0) {
      console.log("client already has reservation terminating process.");
      //client has res handle that
      res.status(409).send({
        status: "failed",
        message: "client already has a reservation",
      });

      return;
      //return a message & end connection
    }
    //insert into reservation table
    const insert_reservation = await client.query(
      "insert into reservations (reservation_date, reservation_time, reservation_type, reservation_location, reservation_duration, client_id) values($1,$2,$3,$4,$5,$6)",
      [
        formated_reservation_date,
        reservation_time,
        reservation_type,
        reservation_location,
        reservation_duration,
        client_id.rows[0].client_id,
      ]
    );
    console.log(
      " client doesnt currently have reservation creating reservation..."
    );
    res.status(201).json({
      status: "success",
      message: "Reservation created successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    await client.end();
  }

  res.status(201).send({
    message: "Success",
  });
});

app.post("/api/signup", async (req, res) => {
  const { username, password, first_name, last_name, phone_number } = req.body;

  const client = createClient();
  try {
    await client.connect();

    //insert user into employees table

    const insert_user = await client.query(
      "insert into employees(employee_fname, employee_lname, employee_phone_number, employee_email) values($1,$2,$3,$4) RETURNING *",
      [first_name, last_name, phone_number, username]
    );
    //grab employee id
    const employee_id = await client.query(
      "select employee_id from employees where employee_email = $1",
      [username]
    );
    // insert password as hash
    await bcrypt.hash(password, salt_rounds, async (err, hash) => {
      const insert_password = await client.query(
        "insert into employeePasswords(employee_id, hashed_password) values($1,$2)",
        [employee_id.rows[0].employee_id, hash]
      );
    });
    res.status(201).send({
      status: "successful",
      message: "successfully created account",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    await client.end();
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const client = createClient();

  try {
    await client.connect();

    //grab hash
    const query = `
      SELECT ep.hashed_password, e.employee_fname, e.employee_lname
      FROM employeePasswords ep
      JOIN employees e ON ep.employee_id = e.employee_id
      WHERE e.employee_email = $1
    `;
    const results = await client.query(query, [username]);
    //check the length
    if (results.rows.length === 0) {
      return res
        .status(401)
        .send({ status: "failed", message: "not authorized" });
    }
    const hashed_password = results.rows[0].hashed_password;
    //check the password against the hash
    const match = bcrypt.compareSync(password, hashed_password);
    if (match) {
      return res.status(200).send({
        status: "successful",
        message: "successfully logged in",
        data: {
          fname: results.rows[0].employee_fname,
          lname: results.rows[0].employee_lname,
        },
      });
    } else {
      return res.status(401).send({
        status: "failed",
        message: "failed logged in",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  } finally {
    await client.end();
  }
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
