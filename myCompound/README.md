# compound简化版
自己写的compound简化版（参考v2版本），使用openzeppelin的合约模板以及Hardhat开发环境，目前只有ctoken核心合约、利率模型合约、审计合约和价格预言机，部署在sepolia测试网上。（不要部署在goerli，很难部署上去）

- 利率模型合约直接采用compound源码的直线型，WhitePaperInterestRateModel。
- 价格预言机使用chainlink的方法来实现PriceOracle，新写一个PriceOracle实现类ChainlinkPriceOracle。
- 审计合约的逻辑合约采用最早的G1版本ComptrollerG1，代理合约用Unitroller
- 核心合约

