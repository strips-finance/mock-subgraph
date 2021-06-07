import { Address, BigDecimal, TypedMap, ByteArray, Bytes, BigInt } from '@graphprotocol/graph-ts'
import { ethereum, store } from '@graphprotocol/graph-ts'

import {
  // The contract class:
  Strips,
  // The events classes:
  NewMarket,
  PositionOpened,
  PositionClosed,
  PositionLiquidated
} from '../generated/Strips/Strips'

import { Market, Token, Position, Account, PositionMonitor, RandomStore, MarketLiquidityPool } from '../generated/schema'
import { ERC20 } from '../generated/Strips/ERC20'

const DEFAULT_DECIMALS = 18
const POS_MONITOR_ID = '1'

//TODO: can
const START_ADDRESS = '0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef2'


//TODO: optimize it, remove calls on each for. Just get cummulative and recalc based on index
export function handlePnlUpdate(block: ethereum.Block): void {
  let rs = RandomStore.load("1");
  if (rs != null){
    return;
  }

  createMarket(block);
  createAccountsPositions(block);

  rs = new RandomStore("1");
  rs.save()
}

function createPositions(block: ethereum.Block): void {

}

function createAccountsPositions(block: ethereum.Block): void {
  let market1 = Market.load("0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef2");

  let acc1 = new Account("0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef4");
  acc1.portfolioTotal = BigInt.fromI32(2500);
  acc1.portfolio24Change = BigInt.fromI32(-100);
  acc1.portfolioWeekChange = BigInt.fromI32(450);
  acc1.portfolioMonthChange = BigInt.fromI32(2000);
  acc1.marginRatioAvg = BigInt.fromI32(25);
  acc1.leverageAvg = BigInt.fromI32(10);
  acc1.exposureTotal = BigInt.fromI32(2000);


  let pos1 = new Position("0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef2-0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef4-0");
  pos1.market = market1.id;
  pos1.account = acc1.id;
  pos1.positionType = "Long";
  pos1.status = "Opened";
  pos1.posIndex = BigInt.fromI32(0);
  pos1.created = block.timestamp;
  pos1.notional = BigInt.fromI32(1000);
  pos1.collateral = BigInt.fromI32(100);
  pos1.leverage = BigInt.fromI32(10);
  pos1.openPrice = BigInt.fromI32(115);
  pos1.closePrice = BigInt.fromI32(0);
  pos1.currentPrice = BigInt.fromI32(117);
  pos1.oraclePrice = BigInt.fromI32(119);
  pos1.mratio = BigInt.fromI32(25);
  pos1.pnl = BigInt.fromI32(-123);
  pos1.save();  

  let pos2 = new Position("0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef2-0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef4-1");
  pos2.market = market1.id;
  pos2.account = acc1.id;
  pos2.positionType = "Short";
  pos2.status = "Closed";
  pos2.posIndex = BigInt.fromI32(0);
  pos2.created = block.timestamp;
  pos2.notional = BigInt.fromI32(1000);
  pos2.collateral = BigInt.fromI32(100);
  pos2.leverage = BigInt.fromI32(10);
  pos2.openPrice = BigInt.fromI32(115);
  pos2.closePrice = BigInt.fromI32(119);
  pos2.currentPrice = BigInt.fromI32(117);
  pos2.oraclePrice = BigInt.fromI32(119);
  pos2.mratio = BigInt.fromI32(15);
  pos2.pnl = BigInt.fromI32(130);
  pos2.save();  


  let acc2 = new Account("0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef5");
  acc2.portfolioTotal = BigInt.fromI32(2500);
  acc2.portfolio24Change = BigInt.fromI32(-100);
  acc2.portfolioWeekChange = BigInt.fromI32(450);
  acc2.portfolioMonthChange = BigInt.fromI32(2000);
  acc2.marginRatioAvg = BigInt.fromI32(25);
  acc2.leverageAvg = BigInt.fromI32(10);
  acc2.exposureTotal = BigInt.fromI32(2000);

  let pos3 = new Position("0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef2-0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef5-0");
  pos3.market = market1.id;
  pos3.account = acc2.id;
  pos3.positionType = "Long";
  pos3.status = "Opened";
  pos3.posIndex = BigInt.fromI32(0);
  pos3.created = block.timestamp;
  pos3.notional = BigInt.fromI32(1000);
  pos3.collateral = BigInt.fromI32(100);
  pos3.leverage = BigInt.fromI32(10);
  pos3.openPrice = BigInt.fromI32(115);
  pos3.closePrice = BigInt.fromI32(0);
  pos3.currentPrice = BigInt.fromI32(117);
  pos3.oraclePrice = BigInt.fromI32(119);
  pos3.mratio = BigInt.fromI32(25);
  pos3.pnl = BigInt.fromI32(-123);
  pos3.save();  

  let pos4 = new Position("0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef2-0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef5-1");
  pos4.market = market1.id;
  pos4.account = acc2.id;
  pos4.positionType = "Long";
  pos4.status = "Liquidated";
  pos4.posIndex = BigInt.fromI32(0);
  pos4.created = block.timestamp;
  pos4.notional = BigInt.fromI32(1000);
  pos4.collateral = BigInt.fromI32(100);
  pos4.leverage = BigInt.fromI32(10);
  pos4.openPrice = BigInt.fromI32(115);
  pos4.closePrice = BigInt.fromI32(0);
  pos4.currentPrice = BigInt.fromI32(117);
  pos4.oraclePrice = BigInt.fromI32(119);
  pos4.mratio = BigInt.fromI32(15);
  pos4.pnl = BigInt.fromI32(130);
  pos4.save();  

  let acc3 = new Account("0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef6");
  let acc4 = new Account("0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef7");

  acc1.save();
  acc2.save();
  acc3.save();
  acc4.save();
}

function createMarket(block: ethereum.Block): void {
  let token1 = createToken("0x4E4b31eB0E5CB73641EE1E65E7dCEFe520bA3ef3");
  let market1 = new Market("0x4E4b31eB0E5CB73641EE1E65E7dCEFe520bA3ef2");
  let pool1 = createPool("0x4E4b31eB0E5CB73641EE1E65E7dCEFe520bA3ef2")
  market1.name = "Nerve";
  market1.assetSymbol = "3pool";
  market1.created = block.timestamp;
  market1.createdAtBlock = block.number;
  market1.createdAtTransaction = block.hash;

  market1.initialPrice = BigInt.fromI32(115);
  market1.currentPrice = BigInt.fromI32(118);
  market1.currentPrice24Change = BigInt.fromI32(3);
  market1.oraclePrice = BigInt.fromI32(123);
  market1.oraclePrice24Change = BigInt.fromI32(-4);
  market1.turnover24 = BigInt.fromI32(999);


  token1.market = market1.id;
  market1.token = token1.id;
  market1.pool = pool1.id;
  pool1.save()
  token1.save();
  market1.save();

  let token2 = createToken("0x5E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef4");
  let market2 = new Market("0x5E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef5");
  let pool2 = createPool("0x5E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef5")
  market2.name = "AAVE";
  market2.assetSymbol = "USDC-OTHER pool";
  market2.created = block.timestamp;
  market2.createdAtBlock = block.number;
  market2.createdAtTransaction = block.hash;

  market2.initialPrice = BigInt.fromI32(105);
  market2.currentPrice = BigInt.fromI32(111);
  market2.currentPrice24Change = BigInt.fromI32(-4);
  market2.oraclePrice = BigInt.fromI32(90);
  market2.oraclePrice24Change = BigInt.fromI32(-40);
  market2.turnover24 = BigInt.fromI32(77);


  token2.market = market2.id;
  market2.token = token2.id;
  market2.pool = pool2.id;
  pool2.save()
  token2.save();
  market2.save();

}


function createToken(id:string): Token {
  let token = new Token(id);
  token.address = Address.fromString(id);
  token.decimals = 18;
  token.name = "Strips LP token";
  token.symbol = "SLP";

  return token;
}

function createPool(id:string): MarketLiquidityPool {
  let pool = new MarketLiquidityPool(id);
  pool.stackedLiquidity = BigInt.fromI32(89123);
  pool.unrealizedProfit = BigInt.fromI32(1232);

  return pool;
}