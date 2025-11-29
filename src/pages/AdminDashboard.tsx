import { useEffect, useState } from "react";
import { coreApi } from "../services/api";
import type { Transaction } from "../types";
import {
  Container, Typography, Button, Paper,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Card, CardContent
} from "@mui/material";
import "../styles/admin.css"; // <-- add CSS file

export default function AdminDashboard() {
  const [txns, setTxns] = useState<Transaction[]>([]);

  async function load() {
    const res = await coreApi.get<Transaction[]>("/transactions");
    setTxns(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Container className="admin-container">

      <Card className="admin-header-card" elevation={5}>
        <CardContent>
          <Typography variant="h4" className="admin-title">🛡 Super Admin Dashboard</Typography>
          <Typography className="admin-subtitle">
            Monitor all banking transactions in real time
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        className="refresh-btn"
        onClick={load}
      >
        Refresh
      </Button>

      <TableContainer component={Paper} elevation={5} className="admin-table-container">
        <Table>
          <TableHead>
            <TableRow className="table-header-row">
              <TableCell>ID</TableCell>
              <TableCell>Card</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {txns.map((t) => (
              <TableRow key={t.id} className="table-row">
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.cardNumber}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>₹{t.amount}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell>{t.reason}</TableCell>
                <TableCell>{t.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

    </Container>
  );
}
