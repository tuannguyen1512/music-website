
import { createClient } from '@supabase/supabase-js';

import { Database } from "@/types"

import { stripe } from './stripe';
import { toDateTime } from './helpers';

//I think this is just linking payment accounts with the db

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);



  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.

export {
};