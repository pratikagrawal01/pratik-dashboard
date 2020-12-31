echo "Connecting to $args[0]"
$Server= $args[0]
$User="qa\pagrawal"
cmdkey /add:"TERMSRV/$Server" /user:$User
mstsc /v:$Server