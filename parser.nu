#!/usr/bin/env nu

def convertTypes [type: string] {
  let cleanedType = $type | split row " " | last
  match $cleanedType {
    "gboolean" => "bool"
    "float" | "gfloat" => "f32"
    "double" | "gdouble" => "f64"
    "gint8" | "gchar" | "char" => "i8"
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
    "char*" | "gchar*" => "cstring"
    "void" => "void"
    _ => { if (($cleanedType) | str ends-with "*") { "ptr" } else { "u32" } }
  }
}

def parseFunction [url: string] {
    let array = http get $url | query web -q ".highlight" | each { str join } |
      flatten | get 0 | split row "\n"
    let returnType = convertTypes ($array | get 0)
    let params = $array | skip 2 | drop 2 |
      filter { | it | ($it | str trim | split row " " | length) > 1 }
      each { | it | convertTypes ( $it | str trim | split row " " | drop | last ) } |
      each { | it | $"\"($it)\"" }
    let functionName = $array | get 1 | split row " " | get 0
    $"($functionName): {
      args: ($params) as const,
      returns: \"($returnType)\"
  },
  "
}

def parseEnum [url: string] {
  let html = http get $url
  let enumName = $html | query web -q ".declaration > .docblock" | flatten | str join "" |
    str trim | split row "." | last
  let vals = ($html | query web -q ".enum-members > dd > ul > li > code" | flatten)
  let res = $html | query web -q ".enum-members > dt > code" | flatten | into record |
    items { |key, value| $'($value)=($vals | into value | get ($key | into int))' } | str join ",\n"
  $"export const enum ($enumName) {\n($res)\n}"
}

def parseClass [url: string] {
  let html = http get $url
  let constructors = $html | query web -q ".constructors > .docblock > div > h6 > a" -a href | flatten |
    each { | it | parseFunction $"https://docs.gtk.org/gtk4/($it)"} | str join ""
  let functions = $html | query web -q ".methods > .docblock > div > h6 > a" -a href | flatten |
    filter { | it | not ($it in "method") }
    each { | it | parseFunction $"https://docs.gtk.org/gtk4/($it)"} | str join ""
  $"($constructors)($functions)"
}

def main [url: string] {
  if "/methods" in $url or "/ctor" in $url {
    parseFunction $url
  } else if "/enum" in $url {
    # error make {msg: "Not supported yet !"}
    parseEnum $url
  } else if "/class" in $url {
    parseClass $url
  } else {
    error make {msg: "Not supported yet !"}
  }
}
