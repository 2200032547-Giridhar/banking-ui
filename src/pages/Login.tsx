import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import "../styles/login.css";
import type { Role } from "../types";

interface Props {
  onLogin: (role: Role) => void;
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function handleLogin() {
    if (username === "admin" && password === "admin") {
      onLogin("ADMIN");
      nav("/admin");
    } else if (username === "cust1" && password === "pass") {
      onLogin("CUSTOMER");
      nav("/customer");
    } else {
      alert("Invalid credentials!");
    }
  }

  return (
    <Container className="login-container" maxWidth={false}>
      <div className="login-wrapper">
      <Card className="login-card">
        <CardContent>

          {/* Icon */}
          <Avatar className="login-avatar">
            <LockIcon fontSize="large" />
          </Avatar>

          {/* Title */}
          <Typography variant="h5" className="login-title">
            Secure Login
          </Typography>

          {/* Username */}
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          {/* Button */}
          <Button
            fullWidth
            variant="contained"
            className="login-btn"
            onClick={handleLogin}
          >
            Login
          </Button>

        </CardContent>
      </Card>
      </div>
    </Container>
  );
}
