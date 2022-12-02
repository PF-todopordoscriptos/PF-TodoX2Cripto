import './Metamask.css';
require('@metamask/legacy-web3') // npm i @metamask/legacy-web3 ^2.0.0
const Web3 = require('web3-eth'); // npm i web3-eth // ^1.8.1

function Metamask() {
  const { web3 , ethereum } = window
    
  const InitPayButton = () => {
    //const paymentAddress = ACA VA EL NUMERO DE CUENTA DE METAMASK, DONDE SE DIRIGE EL DINERO..
    //                       ..DE DONDE SALE EL DINERO ES EL NRO DE CTA DE LA EXTENSION DE METAMASK..
    //                       ..COMO EJ SALE Y SE ENVIA HACIA LA MISMA CUENTA..
    //                       ..RECHAZO: Payment failed || EXITO: Payment successful
    const paymentAddress = '0x511cB3cB7b04319448e1a27079eE6021d0A4c7dc'
    const amountEth = 0.0000001 // VALOR REAL TIENE QUE TENER 0. + 7 DIGITOS
                                // TRANSCACCION TIENE IMPUESTO DE 0.0000315 GoerliETH
    //const amountEth = 1 // VALOR DE PRUEVA, VA A SER RECHAZADO
    web3.eth.sendTransaction({
      to: paymentAddress,
      value: web3.toWei(amountEth, 'ether')
    }, (err, transactionId) => {
        if (err) {
          console.log('Payment failed', err)
          document.getElementById('status').innerHTML = 'Payment failed'
        } else {
          console.log('Payment successful', transactionId)
          document.getElementById('status').innerHTML = 'Payment successful'
        }
  })}
 
  return (
    <div className="Meta-App">     
      <div>
        <button className="pay-button" onClick={InitPayButton}>Pay</button>
        <div id="status"></div>    
          {
            window.addEventListener('load', async () => {
              if (window.ethereum ) {
                window.web3 = new Web3(ethereum);
                try {
                  await ethereum.enable();
                  //InitPayButton() // DUPLICA MOVIMIENTOS
                } catch (err) {
                  document.getElementById('status').innerHTML = 'User denied account access'
                }
              } else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider)
                //InitPayButton() // DUPLICA MOVIMIENTOS
              } else {
                document.getElementById('status').innerHTML = 'No Metamask (or other Web3 Provider) installed'
              }
            })
          }
      </div>
    </div>
  );
}

export default Metamask;