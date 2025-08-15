import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker"; // npm install @react-native-picker/picker
import { GlobalStyles } from "@/styles/global";

const Home = () => {
  const [balance, setBalance] = useState("");
  const [risk, setRisk] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [symbol, setSymbol] = useState("XAUUSD");
  const [direction, setDirection] = useState("buy");
  const [results, setResults] = useState<{
    lotSize: number;
    takeProfit: number;
    stopLoss: number;
  } | null>(null);

  // SL/TP distance in pips
  const SL_PIPS = 5;
  const TP_PIPS = 10;

  // Symbol-specific pip size & pip value per lot
  const symbolSettings: Record<
    string,
    { pipSize: number; pipValuePerLot: number }
  > = {
    XAUUSD: { pipSize: 0.01, pipValuePerLot: 1.0 }, // Gold: 1 lot = $1 per pip (0.01)
    XAGUSD: { pipSize: 0.001, pipValuePerLot: 0.5 }, // Silver: 1 lot = $0.5 per pip (0.001)
    GBPUSD: { pipSize: 0.0001, pipValuePerLot: 10.0 },
    EURUSD: { pipSize: 0.0001, pipValuePerLot: 10.0 },
    EURJPY: { pipSize: 0.01, pipValuePerLot: 9.13 }, // value per pip changes with rate
    GBPJPY: { pipSize: 0.01, pipValuePerLot: 9.13 },
  };

  const calculate = () => {
    const bal = parseFloat(balance);
    const riskPct = parseFloat(risk);
    const entry = parseFloat(entryPrice);

    if (isNaN(bal) || isNaN(riskPct) || isNaN(entry)) return;

    // Get pip settings for the selected symbol
    const { pipSize, pipValuePerLot } = symbolSettings[symbol];

    // Step 1: Risk amount in USD
    const riskAmount = bal * (riskPct / 100);

    // Step 2: Lot size
    const lotSize = riskAmount / (SL_PIPS * pipValuePerLot);

    // Step 3: SL & TP based on direction
    let stopLoss: number;
    let takeProfit: number;
    if (direction === "buy") {
      stopLoss = entry - SL_PIPS * pipSize;
      takeProfit = entry + TP_PIPS * pipSize;
    } else {
      stopLoss = entry + SL_PIPS * pipSize;
      takeProfit = entry - TP_PIPS * pipSize;
    }

    setResults({
      lotSize: parseFloat(lotSize.toFixed(2)),
      takeProfit: parseFloat(takeProfit.toFixed(5)),
      stopLoss: parseFloat(stopLoss.toFixed(5)),
    });
  };

  return (
    <View style={GlobalStyles.container}>
      {/* Account Balance */}
      <Text style={GlobalStyles.label}>Account Balance</Text>
      <TextInput
        style={GlobalStyles.input}
        keyboardType="numeric"
        value={balance}
        onChangeText={setBalance}
        placeholder="Enter account balance"
      />

      {/* Risk % */}
      <Text style={GlobalStyles.label}>Risk Taking (%)</Text>
      <TextInput
        style={GlobalStyles.input}
        keyboardType="numeric"
        value={risk}
        onChangeText={setRisk}
        placeholder="Enter risk percentage"
      />

      {/* Entry Price */}
      <Text style={GlobalStyles.label}>Entry Price</Text>
      <TextInput
        style={GlobalStyles.input}
        keyboardType="numeric"
        value={entryPrice}
        onChangeText={setEntryPrice}
        placeholder="Enter entry price"
      />

      {/* Symbol Picker */}
      <Text style={GlobalStyles.label}>Symbol</Text>
      <Picker
        selectedValue={symbol}
        onValueChange={(itemValue) => setSymbol(itemValue)}
      >
        <Picker.Item label="XAUUSD" value="XAUUSD" />
        <Picker.Item label="XAGUSD" value="XAGUSD" />
        <Picker.Item label="GBPUSD" value="GBPUSD" />
        <Picker.Item label="EURUSD" value="EURUSD" />
        <Picker.Item label="EURJPY" value="EURJPY" />
        <Picker.Item label="GBPJPY" value="GBPJPY" />
      </Picker>

      {/* Direction Picker */}
      <Text style={GlobalStyles.label}>Direction</Text>
      <Picker
        selectedValue={direction}
        onValueChange={(itemValue) => setDirection(itemValue)}
      >
        <Picker.Item label="Buy" value="buy" />
        <Picker.Item label="Sell" value="sell" />
      </Picker>

      {/* Calculate Button */}
      <View style={GlobalStyles.buttons}>
        <Button title="Calculate" onPress={calculate} />
      </View>

      {/* Results */}
      {results && (
        <View style={GlobalStyles.results}>
          <Text>Lot Size: {results.lotSize}</Text>
          <Text>Take Profit: {results.takeProfit}</Text>
          <Text>Stop Loss: {results.stopLoss}</Text>
        </View>
      )}
    </View>
  );
};

export default Home;
