<!DOCTYPE html>
<html>
<head>
<title>$title$</title>
<base target="_blank">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body bgcolor="#F4F5F6" style="background-color:#F4F5F6;margin:0;font-family:Arial, sans-serif;font-size:15px;color:#77797C;">

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border:none;"><tbody>
<tr class="top-up">
<td class="left" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#005686;height:76px;"> </td>
          <td class="middle" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;width:550px;max-width:550px;background-color:#005686;height:76px;">
            <img src="cid:header" width="130" height="40" style="padding-top: 18px;">
</td>
          <td class="right" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#005686;height:76px;"> </td>
        </tr>
<tr class="top-bottom">
<td class="left" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#005686;height:64px;"> </td>
          <td class="middle" align="center" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;width:550px;max-width:550px;background-color:#fff;height:64px;padding:0 25px;">
            <div class="main-title" style="color:#3D3D3D;font-size:22px;">$title$</div>
          </td>
          <td class="right" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#005686;height:64px;"> </td>
        </tr>
<tr class="center">
<td class="left" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#F4F5F6;"> </td>
          <td class="middle" style="background-color:#ffffff;font-family:Arial, sans-serif;font-size:15px;color:#77797C;width:550px;max-width:550px;">

              <table class="content-table" border="0" cellpadding="25" cellspacing="0" bgcolor="#FFFFFF" style="border:none;background-color:#ffffff;box-shadow:0 2px 3px rgba(0, 0, 0, 0.1);"><tbody><tr>
<td style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;">
                      <p style="margin-top:0;font-family:Arial, sans-serif;font-size:15px;color:#77797C;">
                        $if(wp.recipientFirstName)$
                          $adj$ $wp.recipientFirstName$ $wp.recipientLastName$,
                        $else$
                          $dearUser$,
                        $endif$
                      </p>
                      <p style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;">
                        $wp.fromFirstName$ $wp.fromLastName$ $preMessage$
                      </p>

                      $if(wp.json.contentData.link)$
                      <p style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;">
                        <a href="$wp.json.contentData.link$" style="color:#368ec4;text-decoration:none;">
                          $wp.json.contentData.title$
                        </a>
                      </p>
                      $endif$

                      <span>
                        <p style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;">
                          $if(!wp.json.contentData.link)$
                          <b>
                            $wp.json.contentData.title$
                          </b>
                          $else$
                            $from$
                            <b>
                              $wp.json.name$
                            </b>
                            $DS_Dashboard_Notification_Handlers_ShareWidget$
                          $endif$
                        </p>
                      </span>

                      $if(wp.message)$
                        <span>
                          <i>
                            "$wp.message$"
                          </i>
                        </span>
                      $endif$

                      <p style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;">
                        <a href="$wp.link$" style="color:#368ec4;text-decoration:none;">$if(!wp.json.contentData.link)$$message$$else$$addWidget$$endif$</a>.
                      </p>

                      <p class="signature" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;margin-top:50px;">
                        $footerMessage$
                        <br>
                        $wp.personal$
                      </p>
                    </td>
                  </tr></tbody></table>
</td>
          <td class="right" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#F4F5F6;"> </td>
        </tr>
<tr class="bottom">
<td class="left" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#F4F5F6;"> </td>
          <td class="middle" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;width:550px;max-width:550px;background-color:#F4F5F6;">

            <table style="border:none;"><tbody>
<tr>
<td height="20" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#F4F5F6;"> </td>
                </tr>
<tr>
<td align="center" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#F4F5F6;">
                    <img src="cid:footer" width="100" height="30">
</td>
                </tr>
<tr>
<td height="20" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#F4F5F6;"> </td>
                </tr>
<tr>
<td class="disclaimer" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#F4F5F6;">
                    <p style="margin-top:0;font-family:Arial, sans-serif;font-size:12px;color:#B4B6BA;">
                     <span>
                        Note that this is an automatically generated email, please do not
                        reply to this email address.
                        <br><br>
                        This email and any attachments are intended solely for the use of the individual or
                        entity to whom it is addressed and may be confidential and/or privileged.
                        <br>
                        If you are not one of the named recipients or have received this email in error,
                        <br><br>
                        (i) you should not read, disclose, or copy it,
                        <br>
                        (ii) please notify sender of your receipt by reply email and delete this email and all
                        attachments,
                        <br>
                        (iii) Dassault Systemes does not accept or assume any liability or responsibility for
                        any use of or reliance on this email.
                        <br><br>
                        For other languages,
                        <a class="second" href="http://www.3ds.com/terms/email-disclaimer" style="color:#368ec4;text-decoration:none;">
                          http://www.3ds.com/terms/email-disclaimer
                        </a>
                      </span>
                    </p>
                  </td>
                </tr>
</tbody></table>
</td>
          <td class="right" style="font-family:Arial, sans-serif;font-size:15px;color:#77797C;background-color:#F4F5F6;"> </td>
        </tr>
</tbody></table>
</body>
</html>
