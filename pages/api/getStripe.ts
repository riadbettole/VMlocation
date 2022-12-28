import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51MJNe6CgnwrlCMdcqKnO25ppiSnbv6aULlWvYPZjPdtaiEwiT9P1k15cY6jldr2ORhNMkXNReUw0dFpWzKQdgJNu00kwVdAu37")
  }
  return stripePromise
}

export default getStripe