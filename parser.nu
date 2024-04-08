#!/usr/bin/env nu

def convertTypes [type: string] {
  match $type {
    "gboolean" => "bool"
    "float" | "gfloat" => "f32"
    "double" | "gdouble" => "f64"
    "gint8" | "gchar" => "i8"
    "guint8" | "guchar" => "u8"
    "gint16" | "gshort" => "i16"
    "guint16" | "gushort" => "u16"
    "gint32" | "gint" => "i32"
    "guint32" | "guint" => "u32"
    "gint64" | "glong" => "i64"
    "guint64" | "gulong" => "u64"
    "gpointer" => "ptr"
    "gconstpointer" => "ptr"
    "gsize" => "usize"
    "char*" => "cstring"
    _ => { if (($type) | str ends-with "*") { "ptr" } else { "void" } }
  }
}

def main [url: string] {
  let array = http get $url | query web -q ".highlight" | each { str join } | flatten | get 0 | split row "\n"
  let returnType = convertTypes ($array | get 0)
  # let params = if (() | str ends-with "*") { "ptr" } else { $array | get 0 }
  # let paramsArray = $array | skip 2 | drop 2
  # let params = $array | skip 2 | drop 2 | each { | it | if (($it | str trim | split row " " | get 0) | str ends-with "*") { "ptr" } else { $it | str trim } } | each { | it | $"\"($it)\"" }
  let params = $array | skip 2 | drop 2 | each { | it | convertTypes ( $it | str trim | split row " " | get 0 ) } | each { | it | $"\"($it)\"" }
  let functionName = $array | get 1 | split row " " | get 0
  $"($functionName): {
    args: ($params) as const,
    returns: \"($returnType)\"
},
"
}
