SELECT "T3"."bas_yy" AS "C87A3F9A0" -- 기준년도
,SUM("T2"."cnt") AS "C1ED14E63" -- 직원수

 FROM   "tb_keris_sgoc_std" "T1" -- 학교급별개황_학생수
  LEFT OUTER JOIN "tb_keris_sgoc_stff" "T2" -- 학교급별개황_직원수
 ON ("T1"."bas_yy" = "T2"."bas_yy" AND "T1"."city_dvcd" = "T2"."city_dvcd" AND "T1"."gnd_dvcd" = "T2"."gnd_dvcd" AND "T1"."schsys_dvcd" = "T2"."schsys_dvcd" AND "T1"."cls_dvcd" = "T2"."stff_dvcd") INNER JOIN "tb_keris_sgoc_teac" "T3" -- 학교급별개황_교원수
 ON ("T1"."bas_yy" = "T3"."bas_yy" AND "T1"."city_dvcd" = "T3"."city_dvcd" AND "T1"."gnd_dvcd" = "T3"."gnd_dvcd" AND "T1"."schsys_dvcd" = "T3"."schsys_dvcd" AND "T1"."cls_dvcd" = "T3"."teac_dvcd")
 GROUP BY "T3"."bas_yy"