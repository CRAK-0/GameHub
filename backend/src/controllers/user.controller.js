import bcrypt from "bcrypt";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // 2. Insert into PostgreSQL
    const result = await pool.query(
      `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username, email
            `,
      [username, email, hashedPassword],
    );

    // 3. Send created user
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    // 4. Duplicate value
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    // 5. Unexpected error
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const result = await pool.query(
      `
        SELECT id, username, email, password
        FROM users
        WHERE email = $1
      `,
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT id, username, email
        FROM users
        WHERE id = $1
      `,
      [req.user],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("accessToken");

  return res.status(200).json({
    message: "Logout successful",
  });
};

export const getCurrentUser = async (req, res) => {
  try {
    const result = await pool.query(
      `
    SELECT id, username, email, is_admin
    FROM users
    WHERE id = $1
  `,
      [req.user],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];

    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        is_admin: user.is_admin,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
