import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wbqsdmwseonjddmvqinc.supabase.co'
const supabaseKey = 'sb_publishable_VbogPDaIMRBmIpnzEEV-tQ_BpldufmA'

export const supabase = createClient(supabaseUrl, supabaseKey)