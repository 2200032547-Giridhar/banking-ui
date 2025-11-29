import { useEffect, useState } from "react";
import { gatewayApi, coreApi } from "../services/api";
import type { Transaction, Card } from "../types";
import {
  Container, Card as MUICard, CardContent, Typography,
  Button, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Grid, Divider
} from "@mui/material";
import "../styles/customer.css"; // <-- ADD THIS

const CARD_NUMBER = "4123456789012345";
const PIN = "1234";

export default function CustomerDashboard() {
  const [card, setCard] = useState<Card | null>(null);
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [amountTopup, setAmountTopup] = useState<number>(0);
  const [amountWithdraw, setAmountWithdraw] = useState<number>(0);

  async function loadData() {
    const [cardRes, txnRes] = await Promise.all([
      coreApi.get<Card>(`/cards/${CARD_NUMBER}`),
      coreApi.get<Transaction[]>(`/transactions/${CARD_NUMBER}`)
    ]);
    setCard(cardRes.data);
    setTxns(txnRes.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleTopup() {
    if (amountTopup <= 0) return alert("Amount must be > 0");

    const res = await gatewayApi.post("/transaction", {
      cardNumber: CARD_NUMBER,
      pin: PIN,
      amount: amountTopup,
      type: "topup"
    });

    alert(res.data.message);
    setAmountTopup(0);
    loadData();
  }

  async function handleWithdraw() {
    if (amountWithdraw <= 0) return alert("Amount must be > 0");

    const res = await gatewayApi.post("/transaction", {
      cardNumber: CARD_NUMBER,
      pin: PIN,
      amount: amountWithdraw,
      type: "withdraw"
    });

    alert(res.data.message);
    setAmountWithdraw(0);
    loadData();
  }

  return (
    <Container className="customer-container">

      <Typography variant="h4" className="header">
        Customer Dashboard
      </Typography>

      {card && (
        <MUICard className="card-box" elevation={5}>
          <CardContent>
            <Typography variant="h5" className="section-title">💳 Card Details</Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography className="info-text">
              <b>Card Number:</b> {card.cardNumber}
            </Typography>
            <Typography className="info-text">
              <b>Customer Name:</b> {card.customerName}
            </Typography>
            <Typography className="info-text balance">
              <b>Balance:</b> ₹{card.balance}
            </Typography>
          </CardContent>
        </MUICard>
      )}

      <Grid container spacing={4} className="grid-box">

        {/* TOP UP */}
        <Grid item xs={12} md={6}>
          <MUICard elevation={4} className="action-card">
            <CardContent>
              <Typography variant="h6" className="section-title">➕ Top-Up</Typography>
              <Divider sx={{ mb: 2 }} />

              <TextField
                label="Enter Top-Up Amount"
                variant="outlined"
                type="number"
                fullWidth
                className="input-field"
                value={amountTopup}
                onChange={(e) => setAmountTopup(Number(e.target.value))}
              />

              <Button
                variant="contained"
                fullWidth
                className="btn-topup"
                onClick={handleTopup}
              >
                Add Money
              </Button>
            </CardContent>
          </MUICard>
        </Grid>

        {/* WITHDRAW */}
        <Grid item xs={12} md={6}>
          <MUICard elevation={4} className="action-card">
            <CardContent>
              <Typography variant="h6" className="section-title">💸 Withdraw</Typography>
              <Divider sx={{ mb: 2 }} />

              <TextField
                label="Enter Withdrawal Amount"
                variant="outlined"
                type="number"
                fullWidth
                className="input-field"
                value={amountWithdraw}
                onChange={(e) => setAmountWithdraw(Number(e.target.value))}
              />

              <Button
                variant="contained"
                fullWidth
                className="btn-withdraw"
                onClick={handleWithdraw}
              >
                Withdraw Money
              </Button>
            </CardContent>
          </MUICard>
        </Grid>


      </Grid>

      {/* TRANSACTIONS */}
      <Typography variant="h5" className="section-title" style={{ marginTop: "40px" }}>
        📜 Transaction History
      </Typography>

      <TableContainer component={Paper} elevation={4} className="table-container">
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell>ID</TableCell>
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
