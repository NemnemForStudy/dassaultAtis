<!DOCTYPE html>
<html>
  <head>

    <title>$title$</title>

    <base target="_blank"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <style type="text/css">
      body {
        background-color: #F4F5F6;
        margin: 0;
      }
      body, td, p {
        font-family: Arial, sans-serif;
        font-size: 15px;
        color: #77797C;
      }
      table {
        border: none;
      }
      a {
        color: #368ec4;
        text-decoration: none;
      }
      a:hover {
        color: #368ec4;
        text-decoration: underline;
      }
      a:visited {
        color: #368ec4;
        text-decoration: underline;
      }

      .top-up td,
      .top-bottom td {
        background-color: #005686;
      }
      .top-up td {
        height: 76px;
      }
      .top-bottom td {
        height: 64px;
      }
      .top-bottom .middle {
        background-color: #fff;
        padding: 0 25px;
      }
      .center .left,
      .center .right,
      .bottom td {
        background-color: #F4F5F6;
      }
      .middle {
        width: 550px;
        max-width: 550px;
      }

      .main-title {
        color: #3D3D3D;
        font-size: 22px;
      }

      .content-table {
        background-color: #ffffff;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
      }
      .signature {
        font-size: 15px;
        margin-top: 50px;
      }
      .disclaimer p {
        font-size: 12px;
        color: #B4B6BA;
      }
    </style>
  </head>

  <body bgcolor="#F4F5F6">

    <table cellpadding="0" cellspacing="0" border="0" width="100%" >
      <tbody>

        <tr class="top-up">
          <td class="left">&nbsp;</td>
          <td class="middle">
            <img src="cid:header" width="130" height="40" style="padding-top: 18px;"/>
          </td>
          <td class="right">&nbsp;</td>
        </tr>

        <tr class="top-bottom">
          <td class="left">&nbsp;</td>
          <td class="middle" align="center">
            <div class="main-title">$title$</div>
          </td>
          <td class="right">&nbsp;</td>
        </tr>

        <tr class="center">
          <td class="left">&nbsp;</td>
          <td class="middle" style="background-color: #ffffff">

              <table class="content-table" border="0" cellpadding="25" cellspacing="0" bgcolor="#FFFFFF">
                <tbody>
                  <tr>
                    <td>
                      <p style="margin-top: 0;">
                        $if(wp.recipientFirstName)$
                          $adj$ $wp.recipientFirstName$ $wp.recipientLastName$,
                        $else$
                          $dearUser$,
                        $endif$
                      </p>

                      <p>
                        $wp.fromFirstName$ $wp.fromLastName$ $message$
                        <b>
                          $if(wp.owner)$$owner$$elseif(wp.reader)$$member$$elseif(wp.contributor)$$contributor$$endif$
                        </b>
                        $messageNext$
                      </p>

                      <span class="summary">
                        <p>
                          <b>
                            <a class="first" href="$wp.link$">
                                $wp.contextName$
                            </a>
                          </b>
                        </p>
                      </span>

                      <p>
                        <i>
                          $if(wp.owner)$$ownerText$$elseif(wp.reader)$$readerText$$elseif(wp.contributor)$$contributorText$$endif$
                        </i>
                      </p>

                      <p class="signature">
                        $footerMessage$
                        <br />
                        $wp.personal$
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

            </td>
          <td class="right">&nbsp;</td>
        </tr>

        <tr class="bottom">
          <td class="left">&nbsp;</td>
          <td class="middle">

            <table>
              <tbody>
                <tr>
                  <td height="20">&nbsp;</td>
                </tr>
                <tr>
                  <td align="center">
                    <img src="cid:footer" width="100" height="30"/>
                  </td>
                </tr>
                <tr>
                  <td height="20">&nbsp;</td>
                </tr>
                <tr>
                  <td class="disclaimer">
                    <p style="margin-top: 0;">
                     <span>
                        Note that this is an automatically generated email, please do not
                        reply to this email address.
                        <br>
                        <br>
                        This email and any attachments are intended solely for the use of the individual or
                        entity to whom it is addressed and may be confidential and/or privileged.
                        <br>
                        If you are not one of the named recipients or have received this email in error,
                        <br>
                        <br>
                        (i) you should not read, disclose, or copy it,
                        <br>
                        (ii) please notify sender of your receipt by reply email and delete this email and all
                        attachments,
                        <br>
                        (iii) Dassault Systemes does not accept or assume any liability or responsibility for
                        any use of or reliance on this email.
                        <br>
                        <br>
                        For other languages,
                        <a class="second" href="http://www.3ds.com/terms/email-disclaimer">
                          http://www.3ds.com/terms/email-disclaimer
                        </a>
                      </span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

          </td>
          <td class="right">&nbsp;</td>
        </tr>

      </tbody>
    </table>

  </body>
</html>
