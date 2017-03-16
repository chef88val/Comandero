use ALERTAS_TEST;
SELECT * FROM personal_turnos;

select month(fecha_entrada),sum(TIMESTAMPDIFF(MINUTE,fecha_entrada, fecha_salida)),TIMESTAMPDIFF(MINUTE,fecha_entrada, fecha_salida) as diffdate 
from personal_turnos GROUP BY month(fecha_entrada);
select sum(TIMESTAMPDIFF(MINUTE,fecha_entrada, fecha_salida))
from personal_turnos GROUP BY idpersonal;
select idpersonal,concat(month(fecha_entrada),'/',year(fecha_entrada)), sum(TIMESTAMPDIFF(HOUR,fecha_entrada, fecha_salida))
from personal_turnos GROUP BY idpersonal;
select TIMESTAMPDIFF(HOUR,fecha_entrada, fecha_salida) as diffdate from personal_turnos;
insert into personal_horas (idpersonal,dia_mes,horas) values(1,'2017-03-01',0);
update personal_horas 
set personal_horas.horas=personal_horas.horas+(select  sum(TIMESTAMPDIFF(HOUR,personal_turnos.fecha_entrada, personal_turnos.fecha_salida))
	from personal_turnos where idpersonal=1)
 where personal_horas.idpersonal=1;
 
 insert into personal_horas(idpersonal, dia_mes,horaS) values(
	 1,
	 (select concat(fecha_entrada,'<>',fecha_salida) from personal_turnos where idpersonal=1),
	 (select  sum(TIMESTAMPDIFF(HOUR,personal_turnos.fecha_entrada, personal_turnos.fecha_salida))
	from personal_turnos where idpersonal=1));